import pymongo


myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["vds"]


mycol = mydb["quotes"]

quotes = []


def ins():
    file1 = open('master-quotes.csv', 'r')
    count = 0
    
    while True:
        count += 1
    
        # Get next line from file
        line = file1.readline()
    
        # if line is empty
        # end of file is reached
        if not line:
            break
        
        try:
            values = line.split('"')

            values1 = values[2].split(',')

            quotes.append({"the_quote":values[1],"author":values1[0],"tag":values1[1]})
        except:
            print("ASDASd")
   
    file1.close()

    x = mycol.insert_many(quotes)

    #print list of the _id values of the inserted documents:
    print(x.inserted_ids)




def read(kw):
    myquery = {"$or":[{"the_quote":{"$regex":"^"+kw+"^"}}, {"tag": kw }] }

    mydoc = mycol.find(myquery)

    for x in mydoc:
        print(x)


#myquery = { }

#x = mycol.delete_many(myquery)
read("travel")