import pandas as pd
#import DirectlyJumpingOnQuiz

#print(DirectlyJumpingOnQuiz.directlyJumpingOnQuiz())

resource=pd.read_csv("./../resource_log.csv")
quiz_log=pd.read_csv("./../quiz_log.csv")

def check(i):
    string='session_id == "'+str(resource["session_id"][i])+'" and start_time == "'+str(resource["start_time"][i])+'"'
    filtered = quiz_log.query('score >= 60 and '+string)
    #print(filtered)
    if(len(filtered)):
        return 0
    return 1


visited={}
for i in range(len(resource)):
    #Reading or watching 
    if((resource["flag_id"][i]!=4 and resource["flag_id"][i]!=5)):
        sub_topic=resource["sub_topic_id"][i]
        if(sub_topic in visited):
            visited[sub_topic]=[0]
        else:
            visited[sub_topic]=[1,i]

ans=0
for i in visited:
    if(visited[i][0]==1):
        ans+=check(visited[i][1])
        
print(ans)
