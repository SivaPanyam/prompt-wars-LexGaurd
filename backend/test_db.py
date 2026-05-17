from app.services.storage import StorageService
import asyncio

async def test_db():
    print("Testing Firestore...")
    try:
        service = StorageService()
        doc = service.db.collection('test').document('test').get()
        print("Success! DB is online.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_db())
