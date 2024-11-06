import * as Location from 'expo-location';

// 避難所データを直接定義
const SHELTER_DATA = `
東小学校,寝屋川市太秦元町2-1,072-825-9001,避難所,34.7666,135.6281
第一中学校,寝屋川市高宮新町32-1,072-825-9000,避難所,34.7650,135.6270
市民会館,寝屋川市秦町41-1,072-823-1221,避難所,34.7680,135.6290
`;

export type Shelter = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  types: string[];
  distance?: number;
};

// CSVデータをパースしてShelter配列を返す
export function parseShelterData(): Shelter[] {
  const lines = SHELTER_DATA.trim().split('\n');
  return lines.map((line, index) => {
    const [name, address, phone, type, lat, lng] = line.split(',');
    return {
      id: String(index + 1),
      name,
      address,
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      types: ['地震', '洪水'],
    };
  });
}

// 現在位置から最も近い避難所を取得
export function findNearestShelters(
  currentLocation: Location.LocationObject,
  shelters: Shelter[],
  limit: number = 3
): Shelter[] {
  return shelters
    .map(shelter => ({
      ...shelter,
      distance: calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        shelter.latitude,
        shelter.longitude
      )
    }))
    .sort((a, b) => a.distance! - b.distance!)
    .slice(0, limit);
}

// 2点間の距離を計算（ヘベルサイン公式）
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}