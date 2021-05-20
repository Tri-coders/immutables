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
        var ans1=[]
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
                    if(ans[0][subcomponent[i]]!=undefined)
                        result.push(parseInt(ans[0][subcomponent[i]])*100/size[i])
                    else
                    result.push(parseInt(ans[0][i.toString()])*100/size[i])
                }
                fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/result.csv'))
                    .pipe(csv())
                    .on('data', (data) => {
                        ans1.push(data)
                    })
                    .on('end', () => {
                        var a=[]
                        console.log(ans1)
                        var n=ans1.length
                        if(n>0){
                            a.push(parseFloat(ans1[n-1]['KnowledgeaboutCognition']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['RegulationofCognition']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['DeclarativeKnowledge']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['ProceduralKnowledge']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['ConditionalKnowledge']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['Planning']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['Information']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['Comprehension']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['Debugging']).toFixed(2))
                            a.push(parseFloat(ans1[n-1]['Evaluation']).toFixed(2))
                        }
                            
                        res.send({result:result,ans:a})
                    });
            });
    }else if(data[0]=="TimeReport"){
        var dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
        ans=[0,0,0]
        ans1=[0,0,0,0,0,0]
        ans2=[0,0,0]
        var time,topic
        pdf=["Introduction.pdf","Classes Variables.pdf","Initialization Block.pdf","Methods.pdf","Constructor.pdf","Method Overloading.pdf","Method Overriding.pdf","Inheritance.pdf","Polymorphism.pdf"]
        vdo=["Classes and Objects.mp4","Classes Methods.mp4","Method Overloading.mp4","Method Overriding.mp4","Inheritance.mp4","Single Level Inheritance.mp4","Multi Level Inheritance.mp4","Polymorphism.mp4","Polymorphism example.mp4",]
        // quiz=["Classes and Objectsquiz","Classes Methodsquiz","Inheritancequiz","Polymorphismquiz"]
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/resource_log.csv'))
            .pipe(csv())
            .on('data', (data) => {
                topic=""
                time=0
                if(data['1'] in dic){
                    topic=data['1']
                    time=parseFloat(data['7'])/3.6e+6
                }else if(data['sub_topic_id'] in dic){
                    topic=data['sub_topic_id']
                    time=parseFloat(data['time_spent'])/3.6e+6
                }
                if(topic=="Classes and Objects"){
                    ans[0]+=time
                    ans1[0]+=time
                }else if(topic=="Classes Methods" || topic=="Method Overloading" || topic=="Method Overriding"){
                    ans[1]+=time
                    if(topic=="Classes Methods")
                        ans1[1]+=time
                    else if(topic=="Method Overloading")
                        ans1[2]+=time
                    else if (topic=="Method Overriding")
                        ans1[3]+=time
                }else if(topic=="Inheritance" || topic=="Polymorphism"){
                    ans[2]+=time
                    if(topic=="Inheritance")
                        ans1[4]+=time
                    else if (topic=="Polymorphism")
                        ans1[5]+=time
                }
                if(data['2']!=undefined){
                    if(data['2'] in pdf){
                        ans2[0]+=time
                    }else if(data['2'] in vdo){
                        ans2[1]+=time
                    }
                }else if(data['doc1_id']!=undefined){
                    // console.log(data['doc1_id'] in pdf)
                    // console.log(time)
                    // console.log(ans2)
                    if(pdf.includes(data['doc1_id'])){
                        ans2[0]+=time
                    }else if(vdo.includes(data['doc1_id'])){
                        ans2[1]+=time
                    }
                }
                
            })
            .on('end', () => {
                // console.log(ans);
                fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/quiz_log.csv'))
                    .pipe(csv())
                    .on('data', (data) => {
                        if(data['6']!=undefined){
                            ans2[2]+=parseFloat(data['6'])/3.6e+6
                        }else if(data['time_spent']!=undefined){
                            ans2[2]+=parseFloat(data['time_spent'])/3.6e+6
                        }
                    })
                    .on('end', () => {
                        console.log(ans2);
                       res.send({ans:ans,ans1:ans1,ans2:ans2})
                    });
                
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
                // var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
                var oneWeekBefore = new Date(Date.now() - 12096e5).getTime();
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
                                        //console.log(time)
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
                                //console.log(ans1)
                                res.send({ans1:ans1,ans:ans})
                            });
                    });
            });
    }else if(data[0]=="ResourcesReport"){
        var dic ={"Classes and Objects":1,"Classes Methods":2,"Method Overloading":3,"Method Overriding":4,"Inheritance":5,"Polymorphism":6}
        var session1,session2;
        //session id before 2 weeks and 1 week 
        var twoWeekBefore = new Date(Date.now() - 1.8144e9).getTime();
        // var oneWeekBefore = new Date(Date.now() - 6.048e8).getTime();
        var oneWeekBefore = new Date(Date.now() - 12096e5).getTime();
        // var twoWeekBefore = new Date(Date.now() - 259200000).getTime(); //3 days before for testing
        // var oneWeekBefore = new Date(Date.now() - 172800000).getTime(); //2 days before for testing
        var found1=0,found2=0
        fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/session.csv'))
            .pipe(csv())
            .on('data', (data) => {
                if(found1==0 || found2==0){
                    try{
                        var dateParts
                        if(data['2']!=undefined)
                            dateParts = data['2'].split('/')
                        else
                            dateParts = data['date'].split('/')
                        var date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0]);
                        date = date.getTime();
                        // console.log(date)
                        // console.log(twoWeekBefore)
                        // console.log(oneWeekBefore)
                        // console.log(session1)
                        // console.log(session2)
                        // console.log("")
                        if(found1==0 && date>=twoWeekBefore && date<oneWeekBefore){
                            if(data['0']!=undefined)
                                session1=data['0']
                            else
                                session1=data['session_id']
                            found1=1
                        }else if(found2==0 && date>=oneWeekBefore){
                            if(data['0']!=undefined)
                                session2=data['0']
                            else
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
                // console.log(session1)
                // console.log(session2)
                fs.createReadStream(path.resolve(__dirname, '../../../../../Logs FIles/'+prabodh+'/topic_switch_log.csv'))
                    .pipe(csv())
                    .on('data', (data) => {
                        try{
                            
                            if(flag2=1 || data['0']==session2 || data['session_id']==session2){
                                flag1=0
                                flag2=1
                                console.log(data['current_topic_id'])
                                console.log(2)
                                if(data['1'] in dic){
                                    ans2.push(dic[data["1"]])
                                }else if(data['current_topic_id'] in dic){
                                    ans2.push(dic[data['current_topic_id']])
                                }
                                
                            }
                            if(flag1=1 || data['0']==session1 || data['session_id']==session1){
                                flag1=1
                                console.log(data['current_topic_id'])
                                console.log(1)
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
                        res.send({ans1:ans1,ans2:ans2,name:prabodh})
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