# npx kill-port 5000
# python -m flask run -p 5000
from flask import Flask, request
app = Flask(__name__)
import mysql.connector
import os
# pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()

mydb = mysql.connector.connect(
    host= os.getenv('DB_HOST'), 
    user= os.getenv('DB_USER'), 
    password= os.getenv('DB_PASSWORD'), 
    database= os.getenv('DB_DATABASE')
)
if mydb.is_connected():
    print('connected to database')

@app.route('/')
def hello():
    return 'server running on port 5000'

@app.route('/battery', methods=['GET'])
def get_battery():
    cursor = mydb.cursor()
    cursor.execute('SELECT * FROM battery')
    result = cursor.fetchall()
    items = [f"{row[0]} {row[1]} {row[2]}" for row in result]
    return "<br>".join(items)

@app.route('/battery', methods=['POST'])
def create_battery():
    print(request.json)
    name = request.json['name']
    price = request.json['price']
    cursor = mydb.cursor()
    query = ('insert into battery (name, price) values (%s, %s)')
    cursor.execute(query, (name, price))
    mydb.commit()
    cursor.close()
    return 'battery created', 200

@app.route('/battery/<int:battery_id>', methods=['DELETE'])
def delete_battery(battery_id):
    cursor = mydb.cursor()
    query = ('DELETE FROM battery WHERE id = %s')
    cursor.execute(query, (battery_id,))
    mydb.commit()
    cursor.close()
    return f'battery with id {battery_id} deleted', 200

@app.route('/battery/<int:battery_id>', methods=['PUT'])
def update_battery(battery_id):
    print(request.json)
    name = request.json['name']
    price = request.json['price']
    cursor = mydb.cursor()
    query = ('UPDATE battery SET name = %s, price = %s WHERE id = %s')
    cursor.execute(query, (name, price, battery_id))
    mydb.commit()
    cursor.close()
    return f'battery with id {battery_id} updated', 200


if __name__ == '__main__':
    app.run(port=5000)
