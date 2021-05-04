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

def usecases3and4(prabodh):
    resource=pd.read_csv('./../'+prabodh+'/resource_log.csv')
    quiz_log=pd.read_csv('./../'+prabodh+'/quiz_log.csv')
    session_log=pd.read_csv('./../'+prabodh+'/session.csv')

    tod = datetime.datetime.now()
    d = datetime.timedelta(days = 14)
    a=str((tod - d)).split()[0].split('-')
    twoWeekBefore = datetime.datetime(int(a[0]),int(a[1]),int(a[2]))
    print((quiz_log['time_spent']))
usecases3and4("3prabodh")
