############ User API
#echo -e ""
#echo -e "Testing POST -- /api/user"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"email":"mark.karavan@gmail.com", "password":"homey", "password2":"homey", "sex":"female", "avatar":"aasdfgfdefg", "dob":"april71983"}' http://127.0.0.1:3000/api/user

#echo -e ""
#echo -e "Testing GET -- /api/user/545173647db42f924010dbc4"
#sudo curl -i -X GET http://127.0.0.1:3000/api/user/545173647db42f924010dbc4

#echo -e ""
#echo -e "Testing PUT -- /api/user/password"
#sudo curl -X PUT -d email=homey@clown.com -d password=bar http://127.0.0.1:3000/api/user/password

#echo -e ""
#echo -e "Testing DELETE -- /api/user/545173647db42f924010dbc4"
#sudo curl -X DELETE http://127.0.0.1:3000/api/user/545173647db42f924010dbc4

#echo -e ""
#echo -e "Testing GET -- /api/user/list"
#sudo curl -i -X GET http://127.0.0.1:3000/api/user/list

#echo -e ""
#echo -e "Testing PUT -- /api/user"
#sudo curl -X PUT -d email=homey@clown.com -d password=foobar -d first_name=dude -d last_name=bro -d sex=other http://127.0.0.1:3000/api/user/

#echo -e ""
#echo -e "Testing POST -- /api/user/avatar"
#curl -F "slug=545011cb9935a84a1412e93c" -F "filecomment=This is an image file" -F "image=@/Users/markkaravan/Desktop/hammer.png" http://127.0.0.1:3000/api/user/avatar

#echo -e ""
#echo -e "Testing PUT -- /api/user/addlogin"
#sudo curl -X PUT -d email=mark.karavan@gmail.com -d password=marco http://127.0.0.1:3000/api/user/

#echo -e ""
#echo -e "Testing PUT -- /api/user/resetpassword"
#sudo curl -X PUT -d email=mark.karavan@gmail.com http://127.0.0.1:3000/api/user/resetpassword

#echo -e ""
#echo -e "Testing POST -- /login"
#sudo curl -X POST -d username=admin -d password=admin http://127.0.0.1:3000/login


#########  Contest API
#echo -e ""
#echo -e "Testing POST -- /api/contest"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"title":"hot dudes", "tags":["men", "sexy", "dudes"]}' http://127.0.0.1:3000/api/contest

#echo -e ""
#echo -e "Testing PUT -- /api/contest"
#sudo curl -X PUT -d foo=bar http://127.0.0.1:3000/api/contest

#echo -e ""
#echo -e "Testing GET -- /api/contest/byId/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byId/545575c898c68776057d708f

#echo -e ""
#echo -e "Testing GET -- /api/contest/byName/:str"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byName/hot

#echo -e ""
#echo -e "Testing GET -- /api/contest/byTag/:tag"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byTag/dudes

#echo -e ""
#echo -e "Testing GET -- /api/contest/byCreator/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byCreator/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byCompetitor/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byCompetitor/5454926dae212dd39c0b33ef

echo -e ""
echo -e "Testing GET -- /api/contest/byJudge/:slug"
sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byJudge/5454926dae212dd39c0b33ef

#echo -e ""
#echo -e "Testing DELETE -- /api/contest/:slug"
#sudo curl -X DELETE http://127.0.0.1:3000/api/contest/12345

#echo -e ""
#echo -e "Testing PUT -- /api/contest/compete/:slug"
#sudo curl -X PUT http://127.0.0.1:3000/api/contest/compete/12345

#echo -e ""
#echo -e "Testing PUT -- /api/contest/judge/:slug"
#sudo curl -X PUT http://127.0.0.1:3000/api/contest/judge/12345



######### Entry API
#echo -e ""
#echo -e "Testing POST -- /api/contest/addEntry"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455957c9b845bbf24643a35", "content":"Insert image here"}' http://127.0.0.1:3000/api/contest/addEntry

#echo -e ""
#echo -e "Testing POST -- /api/contest/compete"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"5454926dae212dd39c0b33ef"}' http://127.0.0.1:3000/api/contest/compete

#echo -e ""
#echo -e "Testing POST -- /api/contest/judge"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"5454926dae212dd39c0b33ef"}' http://127.0.0.1:3000/api/contest/judge

#echo -e ""
#echo -e "Testing POST -- /api/contest/compete"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"54547f9399cbfb99897492a8"}' http://127.0.0.1:3000/api/contest/compete

#echo -e ""
#echo -e "Testing POST -- /api/contest/judge"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"54547f9399cbfb99897492a8"}' http://127.0.0.1:3000/api/contest/judge

#echo -e ""
#echo -e "Testing POST -- /api/contest/compete"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"545421741ff444be36883c5d"}' http://127.0.0.1:3000/api/contest/compete

#echo -e ""
#echo -e "Testing POST -- /api/contest/judge"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455c48a7eef497c4898ef77", "user":"545421741ff444be36883c5d"}' http://127.0.0.1:3000/api/contest/judge

#echo -e ""
#echo -e "Testing POST -- /api/contest/compete"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"contest": "5455bff2abc74fa74376e379", "user":"5454926dae212dd39c0b33ef"}' http://127.0.0.1:3000/api/contest/compete
