from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Use a list to store items with auto-incrementing IDs
todos=[]

next_id = 1

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],              # Orígenes permitidos
    allow_credentials=True,             # Permitir cookies/autenticación
    allow_methods=["*"],                # Métodos HTTP permitidos (GET, POST, etc.)
    allow_headers=["*"],                # Headers permitidos
)

class TodoCreate(BaseModel):
    title: str
    task:str
    done: bool = False


@app.get("/todos/", response_model=List[TodoCreate])
def read_todo():
    return todos

@app.post("/todos/", response_model=TodoCreate)
async def create_todo(todo: TodoCreate):
    global next_id
    
    new_todo= {
        "id": next_id,
        "title": todo.title,
        "task": todo.task,
        "done":todo.done
    }
    
    todos.append(new_todo)
    next_id += 1
    return new_todo
    
 

@app.get("/items/{todo_id}", response_model=TodoCreate)
def read_todo(todo_id: int):
    for todo in todos:
        if todo["id"] == todo_id:
            return todo
    
    raise HTTPException(status_code=404, detail="todo not found")




@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(todos):
        if item["id"] == item_id:
            deleted_item = todos.pop(i)
            return {"message": f"Item {deleted_item['name']} deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Item not found")
