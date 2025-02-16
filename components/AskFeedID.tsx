import { CameraView, Camera } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import { CameraIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { HStack } from '~/components/ui/hstack';
import { Input, InputField } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import { FEED_ID_REGEX } from '~/context/FeedIDContext';

interface AskFeedIDProps {
  onSubmit: (feedID: string) => Promise<void>;
  onError: (message: string) => void;
}

export default function AskFeedID({ onSubmit, onError }: AskFeedIDProps) {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermission();
  }, []);
  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setIsScanning(false);
    if (!FEED_ID_REGEX.test(data)) {
      setValidationError('Geçersiz QR Kod');
      onError('QR kod geçersiz format');
      return;
    }
    setInputValue(data);
  };
  const handleSubmit = async () => {
    try {
      if (!inputValue.trim()) {
        throw new Error('Cihaz numarası boş olamaz');
      }

      await onSubmit(inputValue.trim());
      setValidationError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'hatalı numara';
      setValidationError(errorMessage);
      onError(errorMessage);
    }
  };

  return (
    <VStack className="w-full p-4" space="md">
      <Text size="lg" className=" text-center text-typography-500">
        Lütfen cihaz numaranızı girin
      </Text>
      <VStack className="flex h-full w-full items-center gap-6">
        <Input variant="outline" size="md">
          <InputField
            placeholder="cihaz no girin..."
            value={inputValue}
            onChangeText={setInputValue}
          />
        </Input>
        <Text bold className="text-sm text-typography-400">
          Cihaz numaranız, cihazın arkasında bulunan QR koddan okunabilir.
        </Text>
        <HStack className="my-4 w-full items-center justify-center" space="md">
          <Button
            size="lg"
            variant="outline"
            onPress={() => {
              if (hasPermission) {
                setIsScanning(true);
              } else if (hasPermission === false) {
                Alert.alert('Permission Required', 'Please enable camera access in settings');
              }
            }}>
            <ButtonText>QR Tara</ButtonText>
            <ButtonIcon as={CameraIcon} />
          </Button>
          <Button size="lg" variant="solid" onPress={handleSubmit}>
            <ButtonText>Kayıt Ol</ButtonText>
          </Button>
        </HStack>
      </VStack>
      {isScanning && (
        <VStack className="bg-background absolute inset-0 z-10">
          {hasPermission ? (
            <CameraView
              onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
              style={StyleSheet.absoluteFillObject}
            />
          ) : (
            <Text className="p-4 text-center text-red-500">Kamera izni red edildi</Text>
          )}
        </VStack>
      )}

      {validationError && <Text className="text-red-500">{validationError}</Text>}
    </VStack>
  );
}
