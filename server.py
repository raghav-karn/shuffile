import asyncio
import websockets

connected_clients = set()

async def signaling_handler(websocket, path):
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            for client in connected_clients:
                if client != websocket:
                    await client.send(message)
    finally:
        connected_clients.remove(websocket)

start_server = websockets.serve(signaling_handler, "0.0.0.0", 3000)

print("Signaling server running on ws://localhost:3000")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
