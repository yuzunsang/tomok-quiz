import { MongoClient, Db } from "mongodb";

// MongoDB 연결 정보
const MONGODB_URL = process.env.MONGODB_URL!;
const MONGODB_DB = process.env.MONGODB_DB || "todb";

// 타입 선언
interface MongoConnection {
  client: MongoClient;
  db: Db;
}

// 연결 캐싱
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<MongoConnection> {
  // 이미 연결된 클라이언트와 DB가 있다면 재사용
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // 개발 환경에서는 빠른 새로고침을 위해 새 연결을 생성할 수 있음
  if (process.env.NODE_ENV === "development") {
    // 이미 연결이 있다면 닫기
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
    }
  }

  // 새 연결 생성
  const client = new MongoClient(MONGODB_URL);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // 연결 정보 캐싱
  cachedClient = client;
  cachedDb = db;

  // 프로세스 종료 시 연결 닫기
  const closeHandler = async () => {
    if (cachedClient) {
      await cachedClient.close();
      cachedClient = null;
      cachedDb = null;
    }
  };

  // 이미 이벤트 리스너가 등록되지 않았다면 등록
  if (process.env.NODE_ENV === "development") {
    // 개발 환경에서만 이벤트 리스너 추가
    process.on("beforeExit", closeHandler);
  }

  return { client, db };
}
