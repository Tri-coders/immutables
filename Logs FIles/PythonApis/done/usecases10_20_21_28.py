import pandas as pd
import datetime
import time as TIME # (time.mktime(time.strptime("13.07.2015 09:38:17", "%d.%m.%Y %H:%M:%S")))

BENCHMARK=80.0

def usecases10_20_21(prabodh,BENCHMARK):
    planning=pd.read_csv('./../../'+prabodh+'/planning.csv')
    topicTime=pd.read_csv('./../../'+prabodh+'/topic_time_log.csv')
    session_log=pd.read_csv('./../../'+prabodh+'/session.csv')
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
    #print(session)
    ans10=0
    found=0
    sessionForexcecutionPlanning={}
    
    for i in range(len(planning)):        
        if(found==0 and session.get(planning['session_id'][i])):
            found=1
        if(found):
            ans10=1
            initialplanning = planning.loc[i]
            break
        
    ############# UseCase 21
    finalplanning = planning.loc[len(planning)-1]
    lowtimecase21=TIME.mktime(TIME.strptime(" ".join(session[initialplanning['session_id']]), "%d/%m/%Y %H:%M:%S"))
    uptimecase21 = TIME.mktime(TIME.strptime(" ".join(session[finalplanning['session_id']]), "%d/%m/%Y %H:%M:%S"))
    ans21=0
    lessScoreDic={}
    for i in range(len(quiz_log)):        
        if(found==0 and session.get(quiz_log['session_id'][i])):
            found=1
        if(found):
            #quiz.append([quiz_log['session_id'][i],quiz_log['topic_id'][i],quiz_log['start_time'][i],quiz_log['score'][i]])
            date21=session[quiz_log['session_id'][i]][0]
            t=quiz_log['start_time'][i]
            #print(date21)
            timecase21=TIME.mktime(TIME.strptime(str(date21)+" "+str(t), "%d/%m/%Y %H:%M:%S"))
            if(lowtimecase21<=timecase21 and timecase21<=uptimecase21 and quiz_log['score'][i]<BENCHMARK):
                ans21=1
                break

            ############USE CASE 23
            if(quiz_log['score'][i]<BENCHMARK):
                if(lessScoreDic.get(quiz_log['topic_id'][i])):
                    continue
                else:
                    lessScoreDic[quiz_log['topic_id'][i]]=1
    found=0
    dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
    for i in range(len(planning)):        
        if(found==0 and session.get(planning['session_id'][i])):
            found=i+1
        if(found):
            break
    ans23=0
    ans27=1
    if(found>=2):
        flag=0
        for xx in lessScoreDic:
            if(list(planning.loc[len(planning)-1])[dic[xx]]>list(planning.loc[len(planning)-2])[dic[xx]]):
                flag=1
            else:
                flag=0
                break
        if(flag):
            ans23=1
        else:
            ans23=0
                
    ############### Use Case 28
    ans32=ans21
    found=0
    order=[]
    ans28=1
    for i in range(len(topicTime)):
        if(found==0 and session.get(topicTime['session_id'][i])):
            found=1
        if(found==1):
            s=topicTime['subtopic_id'][i]
            if(s=='Classes and Objects'):
                order.append(1)
            elif(s=='Classes Methods' or s=='Method Overloading' or s=='Method Overriding'):
                order.append(2)
            elif(s=='Inheritance' or s=='Polymorphism'):
                order.append(3)

    for i in range(1,len(order)):
        if(order[i]-order[i-1]==0 or order[i]-order[i-1]==1):
            if(order[i]==3):
                break
            continue
        ans28=0
        break
    ans22=ans21
    ############### USE Case 10 
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

    return [ans10,ans20,ans21,ans28,ans32,ans22,ans23,ans27]
def main():
    ans=usecases10_20_21("11prabodh",BENCHMARK)
    usecase10=ans[0]
    usecase20=ans[1]
    usecase21=ans[2]
    usecase28=ans[3]
    usecase32=ans[4]
    usecase22=ans[5]
    usecase23=ans[6]
    usecase27=ans[7]
    #print(usecase10,usecase20,usecase21,usecase28,usecase32,usecase22,usecase23)
    return ans

