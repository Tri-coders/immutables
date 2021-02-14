import pandas as pd

def directlyJumpingOnQuiz():
    resource=pd.read_csv("./../resource_log.csv")
    quiz_log=pd.read_csv("./../quiz_log.csv")

    doc={}
    video={}
    quiz={}
    ans=0

    #Resource's subtopic id is lets say 1 then doc or video or quiz of that subtopic will contain id like 1%...(where %... means anything)   
    flag=0
    for i in range(len(resource)):
        #If its a quiz
        if((resource["flag_id"][i]==4 or resource["flag_id"][i]==5)):
            sub_topic=resource["sub_topic_id"][i]
            
            if(sub_topic not in doc and sub_topic not in video):
                string='session_id == "'+str(resource["session_id"][i])+'" and start_time == "'+str(resource["start_time"][i])+'"'
                filtered = quiz_log.query('score <= 60 and '+string)
                if(len(filtered)):
                    flag=1
                    ans+=1
            else:
                if(flag):
                    ans-=1
                flag=0
            
        #If its reading doc
        elif(resource["flag_id"][i]==1 or resource["flag_id"][i]==2 or resource["flag_id"][i]==3):
            sub_topic=resource["sub_topic_id"][i]
            if(sub_topic in doc):
                doc[sub_topic]+=1
            else:
                doc[sub_topic]=1
            if(ans>=1 and flag):
                ans-=1
                flag=0

        #If its watching video
        else:
            sub_topic=resource["sub_topic_id"][i]
            if(sub_topic in video):
                video[sub_topic]+=1
            else:
                video[sub_topic]=1
            if(ans>=1 and flag):
                ans-=1
                flag=0
    print(ans)
    return ans
            
directlyJumpingOnQuiz()  
