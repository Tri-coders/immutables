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
import usecases10_20_21_28 as file2
BENCHMARK=80.0 #QUIZ SCORE

def usecases1_2_3_4_5_6_8_15_18_19_26(prabodh,BENCHMARK):
    resource=pd.read_csv('./../../'+prabodh+'/resource_log.csv')
    quiz_log=pd.read_csv('./../../'+prabodh+'/quiz_log.csv')
    session_log=pd.read_csv('./../../'+prabodh+'/session.csv')
    quiz_switch=pd.read_csv('./../../'+prabodh+'/question_switch_log.csv')

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
    quiz_session={}
    for i in range(len(quiz_log)):        
        if(found==0 and session.get(quiz_log['session_id'][i])):
            found=1
        if(found):
            quiz.append([quiz_log['session_id'][i],quiz_log['topic_id'][i],quiz_log['start_time'][i],quiz_log['score'][i]])
            if(quiz_session.get(quiz_log['session_id'][i])):
                pass
            else:
                quiz_session[quiz_log['session_id'][i]]=1
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
    ###########Use case 13, 14
    queAnswered={}
    for i in range(len(quiz_switch)):
        if(quiz_session.get(quiz_switch['session_id'][i])):
            if(queAnswered.get(quiz_switch['init_ques_no'][i])):
                pass
            else:
                if(len(list(quiz_switch['choices'][i].split('-')))>1):
                    queAnswered[quiz_switch['init_ques_no'][i]]=1

    if(len(queAnswered)):
        ans13=1
        ans14=1
    else:
        ans13=0
        ans14=0
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

    ans9=int(not ans19)
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
    singlevisited={}
    found=0
    for i in range(k,len(resource)):
        if(session.get(resource['session_id'][i])):
            found=1
        if(found):
            sub_topic=resource["doc1_id"][i]
            if(visited.get(sub_topic)):
                visited[sub_topic]+=1
            else:
                visited[sub_topic]=1
            if(singlevisited.get(sub_topic)):
                singlevisited[sub_topic]=0
            else:
                singlevisited[sub_topic]=1
    count=0
    for xx in singlevisited:
        if(singlevisited[xx]==1):
            count+=1
    total=len(visited)
    if(total>0 and count*100/total>50):
        ans16=1
    else:
        ans16=0
                
    return [ans1,ans2,ans3,ans4,ans5,ans6,ans8,ans26,ans15,ans18,ans19,ans13,ans14,ans9,ans16]

username="13aditya sabde"
ans=usecases1_2_3_4_5_6_8_15_18_19_26(username,BENCHMARK)
usecase1=0 if ans[0]==0 else 1
usecase2=0 if ans[1]==0 else 1
usecase3=0 if ans[2]==0 else 1
usecase4=0 if ans[3]==0 else 1
usecase5=0 if ans[4]==0 else 1
usecase6=0 if ans[5]==0 else 1
usecase8=0 if ans[6]==0 else 1
usecase26=0 if ans[7]==0 else 1
usecase15=0 if ans[8]==0 else 1
usecase18=0 if ans[9]==0 else 1
usecase19=0 if ans[10]==0 else 1
usecase13=0 if ans[11]==0 else 1
usecase14=0 if ans[12]==0 else 1
usecase9=0 if ans[13]==0 else 1
usecase16=0 if ans[14]==0 else 1
print(usecase1,usecase2,usecase3,usecase4,usecase5,usecase6,usecase8,usecase26,usecase15,usecase18,usecase19,usecase13,usecase14,usecase9,usecase16)
ans=file2.main()
usecase10=0 if ans[0]==0 else 1
usecase20=0 if ans[1]==0 else 1
usecase21=0 if ans[2]==0 else 1
usecase28=0 if ans[3]==0 else 1
usecase32=0 if ans[4]==0 else 1
usecase22=0 if ans[5]==0 else 1
usecase23=0 if ans[6]==0 else 1
usecase27=0 if ans[7]==0 else 1
print(usecase10,usecase20,usecase21,usecase28,usecase32,usecase22,usecase23)

DeclarativeKnowledge  = ((usecase1+usecase3+usecase13+usecase14+usecase18+usecase19+usecase28)*100/7) - ((usecase2+usecase4)*100/9)
ProceduralKnowledge = ((usecase1+usecase3+usecase5+usecase16+usecase20+usecase21)*100/6) - ((usecase2+usecase4+usecase6)*100/9)
ConditionalKnowledge = ((usecase22+usecase18)*100/2) - ((usecase8)*100/3)

KnowledgeaboutCognition = (DeclarativeKnowledge*8/100+ProceduralKnowledge*4/100+ConditionalKnowledge*5/100)*100/17

Planning = ((usecase5+usecase10)*100/2) - ((usecase6+usecase8)*100/4)
Information = ((usecase3+usecase5+usecase16+usecase23+usecase28)*100/5) - ((usecase8)*100/6)
Comprehension = ((usecase16+usecase26)*100/2)
Debugging = ((usecase20+usecase21+usecase32)*100/3)
Evaluation = ((usecase15+usecase27+usecase20)*100/3) - (usecase8*100/4)

RegulationofCognition = (Planning*7/100+Information*10/100+Comprehension*7/100+Debugging*5/100+Evaluation*6/100)*100/35

import csv
data = [[KnowledgeaboutCognition,RegulationofCognition,DeclarativeKnowledge,ProceduralKnowledge,ConditionalKnowledge,Planning,Information,Comprehension,Debugging,Evaluation]]

with open('./../../'+username+'/result.csv', 'a', newline='') as file:
    writer = csv.writer(file,lineterminator="\n")
    writer.writerows(data)
