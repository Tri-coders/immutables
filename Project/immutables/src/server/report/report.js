const express = require('express')
const report = express.Router()
const cors = require('cors')
report.use(cors())

const csv = require('csv-parser')
const fs = require('fs')

report.use(express.static(__dirname+"../../../../../"));
report.use(express.static(__dirname+"../../../../../Logs FIles/"));


const path = require('path');
report.post('/report',(req,res)=>{
    var data=req.body;
    console.log(req.body)
    if(data[0]=="PBSscore"){
        var ans=[]
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/selfAssesment.csv'))
            .pipe(csv())
            .on('data', (data) => {
                ans.push(data)
            })
            .on('end', () => {
                // console.log(ans);
                var result=[]
                var subcomponent = ["decl_know","proc_know","cond_know","plan","info","comp","debug","eval"]
                var size = [8,4,5,7,10,7,5,6]
                for(var i=0;i<subcomponent.length;i++){
                    result.push(parseInt(ans[0][subcomponent[i]])*100/size[i])
                }
                res.send(result)
            });
    }else if(data[0]=="PlanningReport"){
        var ans=[],ans0
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/planning.csv'))
            .pipe(csv())
            .on('data', (data) => {
                ans0=data
            })
            .on('end', () => {
                // console.log(ans);
                var f=0
                for(let key in ans0){
                    if(f==0){
                        f=1
                    }else{
                        ans.push(ans0[key])
                    }
                }
                var session1;
                //session id before 2 weeks and 1 week 
                //var twoWeekBefore = new Date(Date.now() - 12096e5).getTime();
                var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
                // var twoWeekBefore = new Date(Date.now() - 259200000).getTime(); //3 days before for testing
                // var oneWeekBefore = new Date(Date.now() - 172800000).getTime(); //2 days before for testing
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
                        //search for session id in topic switch logs for 2 week before and one week before and gather data in two diff variable
                        var flag1=0,ans1=[0,0,0,0,0,0]
                        // console.log(session1)
                        // console.log(session2)
                        var dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
                        console.log(session1)
                        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/resource_log.csv'))
                            .pipe(csv())
                            .on('data', (data) => {
                                try{
                                    if(flag1=1 || data['0']==session1 || data['session_id']==session1){
                                        flag1=1
                                        if(data['7']!=undefined)
                                            time=parseFloat(data['7'])/3.6e+6
                                        else
                                            time=parseFloat(data['time_spent'])/3.6e+6
                                        console.log(time)
                                        if(data['1']!=undefined && !isNaN(time))
                                            ans1[dic[data['1']]-1]+=time
                                        else
                                            if(!isNaN(time))
                                                ans1[dic[data['sub_topic_id']]-1]+=time
                                    
                                     
                                    }
                                }catch(e){
                                    // console.log(e)
                                }
                            })
                            .on('end', () => {
                                console.log(ans1)
                                res.send({ans1:ans1,ans:ans})
                            });
                    });
            });
    }else if(data[0]=="ResourcesReport"){
        var dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
        var session1,session2;
        //session id before 2 weeks and 1 week 
        var twoWeekBefore = new Date(Date.now() - 12096e5).getTime();
        var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
        // var twoWeekBefore = new Date(Date.now() - 259200000).getTime(); //3 days before for testing
        // var oneWeekBefore = new Date(Date.now() - 172800000).getTime(); //2 days before for testing
        var found1=0,found2=0
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
            .pipe(csv())
            .on('data', (data) => {
                if(found1==0 || found2==0){
                    try{
                        var dateParts = data['date'].split('/')
                        var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
                        date = date.getTime();
                        // console.log(date)
                        // console.log(twoWeekBefore)
                        // console.log(oneWeekBefore)
                        // console.log(session1)
                        // console.log(session2)
                        // console.log("")
                        if(found1==0 && date>=twoWeekBefore && date<oneWeekBefore){
                            session1=data['session_id']
                            found1=1
                        }else if(found2==0 && date>=oneWeekBefore){
                            session2=data['session_id']
                            found2=1
                        }
                    }catch(e){

                    }
                }
            })
            .on('end', () => {
                //search for session id in topic switch logs for 2 week before and one week before and gather data in two diff variable
                var flag1=0,flag2=0,ans1=[],ans2=[]
                console.log(session1)
                console.log(session2)
                fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/topic_switch_log.csv'))
                    .pipe(csv())
                    .on('data', (data) => {
                        try{
                            if(flag2=0 || data['0']==session2 || data['session_id']==session2){
                                flag1=0
                                flag2=1
                                if(data['1'] in dic){
                                    ans2.push(dic[data["1"]])
                                }else if(data['current_topic_id'] in dic){
                                    ans2.push(dic[data['current_topic_id']])
                                }
                            }
                            if(flag1=0 || data['0']==session1 || data['session_id']==session1){
                                flag1=1
                                if(data['1'] in dic){
                                    ans1.push(dic[data["1"]])
                                }else if(data['current_topic_id'] in dic){
                                    ans1.push(dic[data['current_topic_id']])
                                }
                            }
                        }catch(e){
                            // console.log(e)
                        }
                    })
                    .on('end', () => {
                        res.send({ans1:ans1,ans2:ans2})
                    });
            });
        






        // fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/topic_switch_log.csv'))
        //     .pipe(csv())
        //     .on('data', (data) => {
        //         try{
        //             console.log(data['1'])
        //             if(data['1'] in dic){
        //                 result.push(dic[data["1"]])
        //             }
        //         }catch(e){
        //             // console.log(e)
        //         }
        //     })
        //     .on('end', () => {
        //         console.log(result)
        //         res.send(result)
        //     });
    }

});

module.exports = report