import mysql.connector

connection = mysql.connector.connect(host='localhost',database='behbes',user='root',password='pass')
cursor = connection.cursor()

with open('illnesses.txt') as illnessFile:
    for line in illnessFile:
        data= line.split('|')
        
        update_illness = ("UPDATE behbes.Illnesses SET Description= (%s) WHERE Name=(%s)")
        cursor.execute(update_illness, (data[1],data[0]))
        
        insert_natural_remedies = ("INSERT INTO Remedies(IllnessID, Type, Hyperlink, Description) "
                            "VALUES ((SELECT IllnessID FROM behbes.Illnesses WHERE Name=(%s)), 'Natural', (%s), (%s))")
        
        natural_remedy_text = data[2].split(';')[0::2]
        natural_remedy_links = data[2].split(';')[1::2]

        natural_remedies = []
        for index in range(0, len(natural_remedy_text)):
            natural_remedies.append((data[0], natural_remedy_text[index], natural_remedy_links[index]))
        
        cursor.executemany(insert_natural_remedies, natural_remedies)

        conventional_remedy_text = data[3].split(';')[0::2]
        conventional_remedy_links = data [3].split(';')[1::2]

        conventional_remedies = []

        for index in range(0,len(conventional_remedy_text)):
            conventional_remedies.append((data[0],conventional_remedy_text[index], conventional_remedy_links[index]))
        insert_conventional_remedies = ("INSERT INTO Remedies(IllnessID, Type, Hyperlink, Description) "
                            "VALUES ((SELECT IllnessID FROM behbes.Illnesses WHERE Name=(%s)), 'Conventional', (%s), (%s))")
        
        cursor.executemany(insert_conventional_remedies, conventional_remedies)

        resource_text = data[4].split(';')[0::2]
        resource_links = data[4].split(';')[1::2]

        resources = []

        for index in range(0,len(resource_text)):
            resources.append((data[0],resource_text[index], resource_links[index]))
        
        insert_resources = ("INSERT INTO Remedies(IllnessID, Type, Hyperlink, Description) "
                            "VALUES ((SELECT IllnessID FROM behbes.Illnesses WHERE Name=(%s)), 'Resource', (%s), (%s))")
        cursor.executemany(insert_resources, resources)


        
connection.commit()
cursor.close()
connection.close()