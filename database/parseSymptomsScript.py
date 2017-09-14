import csv
import pprint
import mysql.connector
import sys

connection = mysql.connector.connect(host='localhost',database='behbes',user='root',password='pass')
cursor = connection.cursor()
symptms = []
illnesses = []
ill_sympt= {}
with open('Illness & Symptoms Chart - Sheet1.csv') as symptoms:
    parser = csv.reader(symptoms,delimiter=',')
    row_count=0
    for row in parser:
        col_count=0
        for col in row:
            if row_count==0 and col_count!=0:
                illnesses.append(str(col))
                ill_sympt[col]=[]
            elif col_count==0 and row_count!=0:
                symptms.append(str(col))
            elif row_count!=0 and col_count!=0 and col=='X':
                ill_sympt[illnesses[col_count-1]].append(symptms[row_count-1])

            col_count+=1
        row_count+=1
                
for symptom in symptms:
    statement="INSERT INTO behbes.Symptoms (Description) VALUES (%s)"
    cursor.execute(statement,(symptom,))

for illness in illnesses:
    statement= "INSERT INTO behbes.Illnesses (Name) VALUES (%s)"
    cursor.execute(statement,(illness,))
    for symptom in ill_sympt[illness]:
        stmt = "INSERT INTO behbes.SymptomIllness (SymptomID, IllnessID) VALUES ((SELECT SymptomID FROM behbes.Symptoms WHERE Description= %s ), (SELECT IllnessID FROM behbes.Illnesses WHERE Name= %s ))"
        cursor.execute(stmt,(symptom, illness,))

connection.commit()
cursor.close()
connection.close()