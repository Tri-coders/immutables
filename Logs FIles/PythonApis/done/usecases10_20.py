import pandas as pd
import datetime
import time 

def usecases10and20(prabodh):
    planning=pd.read_csv('./../'+prabodh+'/planning.csv')
    topicTime=pd.read_csv('./../'+prabodh+'/topic_time_log.csv')
    session_log=pd.read_csv('./../'+prabodh+'/session.csv')
    quiz_log=pd.read_csv('./../../'+prabodh+'/quiz_log.csv')

    tod = datetime.datetime.now()
    d = datetime.timedelta(days = 14)
    a=str((tod - d)).split()[0].split('-')
    twoWeekBefore = datetime.datetime(int(a[0]),int(a[1]),int(a[2]))

    session={}
    for i in range(len(session_log)):
        temp=session_log['date'][i].split('/')
        date=datetime.datetime(int(temp[2]),int(temp[1]),int(temp[0]))
        if(date>=twoWeekBefore):
            session[session_log['session_id'][i]]=[session_log['date'][i],session_log['start_time'][i]]

    ans10=0
    found=0
    sessionForexcecutionPlanning={}
    for i in range(len(planning)):        
        if(found==0 and session.get(planning['session_id'][i])):
            found=1
        if(found):
            ans10=1
            break
    
    if(ans10):
        temp=session[planning['session_id'][len(planning)-1]][0].split('/')
        before=datetime.datetime(int(temp[2]),int(temp[1]),int(temp[0]))
        dic ={"Classes and Objects":0,"Classes Methods":0,"Method Overloading":0,"Method Overriding":0,"Inheritance":0,"Polymorphism":0}
        found=0
        for i in range(len(topicTime)):
            if(found==0):
                temp=session[topicTime['session_id'][i]][0].split('/')
                after=datetime.datetime(int(temp[2]),int(temp[1]),int(temp[0]))
                if(after>=before):
                    found=1
            if(found==1):
                time = int(topicTime['time_spent'][i])/(1000*60*60)
                try:
                    dic[topicTime['subtopic_id'][i]]+=time      
                except:
                    print("Error:",print(topicTime['subtopic_id'][i]))
        l1=list(planning.loc[len(planning)-1])
        l2=["Classes and Objects","Classes Methods","Method Overloading","Method Overriding","Inheritance","Polymorphism"]
        f=0
        for i in range(6):
            #print((l1[i+1].item()),(dic[l2[i]]))
            if(l1[i+1]>dic[l2[i]]):
                f=1
                break
        if(f==0):
            ans20=1
        else:
            ans20=0

    return [ans10,ans20]

ans=usecases10and20("11prabodh")
usecase10=ans[0]
usecase20=ans[1]
print(usecase10,usecase20)
