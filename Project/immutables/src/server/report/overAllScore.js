/*
fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
    .pipe(csv())
    .on('data', (data) => {
        
    })
    .on('end', () => {
    
    })

*/
function finSesson(){
    var session1;
    var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
    var found1=0
    fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
        .pipe(csv())
        .on('data', (data) => {
            if(found1==0){
                try{
                    if(found1==0){
                        var dateParts
                        if(data['2']!=undefined)
                            dateParts = data['2'].split('/')
                        else
                            dateParts = data['date'].split('/')
                        var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
                        date = date.getTime();
                        
                        if(date>=oneWeekBefore){
                            if(data['0']!=undefined)
                                session1=data['0']
                            else
                                session1=data['session_id']
                            found1=1
                        }
                    }
                }catch(e){

                }
            }
        })
        .on('end', () => {
        
        })

}

async function usecase3and4(){
    /*
    1] 2 week before sessioin id
    2] check that session in quiz log
    3] iterate from that point
    4] get topic name and start time
    5] check that session in resources log
    6] iterate from that point
    7] find first occurance of topic from step 4
    8] compare time from step 4 if quiz time > then increment in variable above else increment in var below
    */
    var session1;
    var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
    var found1=0
    fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
        .pipe(csv())
        .on('data', (data) => {
            if(found1==0){
                try{
                    if(found1==0){
                        var dateParts
                        if(data['2']!=undefined)
                            dateParts = data['2'].split('/')
                        else
                            dateParts = data['date'].split('/')
                        var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
                        date = date.getTime();
                        
                        if(date>=oneWeekBefore){
                            if(data['0']!=undefined)
                                session1=data['0']
                            else
                                session1=data['session_id']
                            found1=1
                        }
                    }
                }catch(e){

                }
            }
        })
        .on('end', () => {
            var found=0
            var detailsfromquiz=[]
            var sessionID,topic,startTime;
            fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/quiz_log.csv'))
                .pipe(csv())
                .on('data', (data) => {
                    if(data['0']!=undefined){
                        found=1
                        sessionID=data['0']
                        topic=data['1']
                        startTime=data['4']
                    }else if(data['session_id']!=undefined){
                        found=1
                        sessionID=data['session_id']
                        topic=data['topic_id']
                        startTime=data['start_time']
                    }
                    if(found==0 && sessionID==session1){
                        found=1
                    }
                    if(found==1){
                        detailsfromquiz.push([sessionID,topic,startTime])
                    }
                })
                .on('end', () => {
                    fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
                        .pipe(csv())
                        .on('data', (data) => {
                            
                        })
                        .on('end', () => {
                        
                        })
                
                })

        })


}