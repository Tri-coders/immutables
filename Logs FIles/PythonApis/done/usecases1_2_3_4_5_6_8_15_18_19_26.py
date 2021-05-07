# 1] 2 week before sessioin id
# 2] check that session in quiz log
# 3] iterate from that point
# 4] get topic name and start time
# 5] check that session in resources log
# 6] iterate from that point
# 7] find first occurance of topic from step 4
# 8] compare time from step 4 if quiz time > then increment in variable above else increment in var below
import pandas as pd
import datetime
import time 

BENCHMARK=80.0 #QUIZ SCORE

def usecases1_2_3_4_5_6_8_15_18_19_26(prabodh,BENCHMARK):
    resource=pd.read_csv('./../../'+prabodh+'/resource_log.csv')
    quiz_log=pd.read_csv('./../../'+prabodh+'/quiz_log.csv')
    session_log=pd.read_csv('./../../'+prabodh+'/session.csv')

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
    found=0
    quiz=[]
    ans1,ans2,ans8,ans26=0,0,0,0
    abovebenchmark=[]
    belowbenchmark=[]
    visited={}
    for i in range(len(quiz_log)):        
        if(found==0 and session.get(quiz_log['session_id'][i])):
            found=1
        if(found):
            quiz.append([quiz_log['session_id'][i],quiz_log['topic_id'][i],quiz_log['start_time'][i],quiz_log['score'][i]])
            
            ############ UseCase 1 and 2
            if(quiz_log['topic_id'][i]!="Super Quiz"):
                if(float(quiz_log['score'][i])>=BENCHMARK):
                    ans1+=1
                else:
                    ans2+=1

            ########### Use Case 26
            ans26+=1

            ########## UseCase 15
            if(quiz_log['score'][i]>=BENCHMARK):
                abovebenchmark.append(quiz_log['topic_id'][i])
            else:
                belowbenchmark.append(quiz_log['topic_id'][i])

            ############ Usecase 19 see at resource for loop
            if(visited.get(quiz_log['topic_id'][i]+"quiz")):
                visited[quiz_log['topic_id'][i]+"quiz"]+=1
            else:
                visited[quiz_log['topic_id'][i]+"quiz"]=1
    
    if(ans26):
        ans26=1
    else:
        ans8=1
        
    abovebenchmark.sort()
    belowbenchmark.sort()
    #print(abovebenchmark)
    #print(belowbenchmark)
    ans15=0
    ans18=0
    for i in range(1,len(abovebenchmark)):
        if(abovebenchmark[i]==abovebenchmark[i-1]):
            ans15=1
            break
    for i in range(1,len(belowbenchmark)):
        if(belowbenchmark[i]==belowbenchmark[i-1]):
            ans18=1
            break
    #print(quiz)
    found=0
    k=len(resource)

    for i in range(len(resource)):        
        if(session.get(resource['session_id'][i])):
            found=1
            k=i
        if(found):
            if(visited.get(resource['doc1_id'][i])):
                visited[resource['doc1_id'][i]]+=1
            else:
                visited[resource['doc1_id'][i]]=1
    allresources=["Introduction.pdf","Classes Variables.pdf","Initialization Block.pdf","Classes and Objects.mp4","Methods.pdf","Constructor.pdf","Classes Methods.mp4","Method Overloading.pdf","Method Overloading.mp4","Method Overriding.pdf","Method Overriding.mp4","Inheritance.pdf","Inheritance.mp4","Single Level Inheritance.mp4","Multi Level Inheritance.mp4","Polymorphism.pdf","Polymorphism.mp4","Polymorphism example.mp4","Classes and Objectsquiz","Classes Methodsquiz","Inheritancequiz","Polymorphismquiz"]
    ans19=1
    print(visited)
    for i in allresources:
        if(not visited.get(i) or visited[i]<1):
            print(i)
            ans19=0
            break

    ans3,ans4,ans5=0,0,0
    dicusecase6={}
    for j in range(len(quiz)):
        flag=0
        for i in range(k,len(resource)):
            if(quiz[j][1]==resource['sub_topic_id'][i]):
                #print(session,resource['session_id'][i])
                date=session[resource['session_id'][i]][0].split('/')
                #print(str(resource['start_time'][i]))
                date=[str(int(x)) for x in date]
                date="/".join(date)
                timeres=time.mktime(time.strptime(str(date)+" "+str(resource['start_time'][i]), "%d/%m/%Y %H:%M:%S"))
            
                date=session[quiz[j][0]][0].split('/')
                #print(str(quiz[j][2]))
                date=[str(int(x)) for x in date]
                date="/".join(date)
                timequiz=time.mktime(time.strptime(str(date)+" "+str(quiz[j][2]), "%d/%m/%Y %H:%M:%S"))
                #print(timequiz,timeres)

                ########## UseCase 3 and 4
                if(timequiz>timeres):
                    if(float(quiz[j][3])>=BENCHMARK):
                        ans3+=1
                    else:
                        ans4+=1
                else:
                    if(float(quiz[j][3])<BENCHMARK):
                        ans5+=1
                flag=1
                break
        if(flag==0):
            dicusecase6[quiz[j][1]]=1
    ans6=len(dicusecase6)

    ########## UseCase 16
    visited={}
    for i in range(k,len(resource)):
        if((resource["flag_id"][i]!=4 and resource["flag_id"][i]!=5)):
            sub_topic=resource["sub_topic_id"][i]
            if(sub_topic in visited):
                visited[sub_topic]+=1
            else:
                visited[sub_topic]=1
    
                
    return [ans1,ans2,ans3,ans4,ans5,ans6,ans8,ans26,ans15,ans18,ans19]

ans=usecases1_2_3_4_5_6_8_15_18_19_26("11prabodh",BENCHMARK)
usecase1=ans[0]
usecase2=ans[1]
usecase3=ans[2]
usecase4=ans[3]
usecase5=ans[4]
usecase6=ans[5]
usecase8=ans[6]
usecase26=ans[7]
usecase15=ans[8]
usecase18=ans[9]
usecase19=ans[10]
print(usecase1,usecase2,usecase3,usecase4,usecase5,usecase6,usecase8,usecase26,usecase15,usecase18,usecase19)
