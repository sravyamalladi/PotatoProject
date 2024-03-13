

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]



@app.get("/ping")
async def ping():
    return "Hello, I am alive"


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)

