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
echo -e ""
echo -e "Testing POST -- /api/contest"
sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"title":"hot guys", "tags":["hot", "studs", "dudes"]}' http://127.0.0.1:3000/api/contest

#echo -e ""
#echo -e "Testing PUT -- /api/contest"
#sudo curl -X PUT -d foo=bar http://127.0.0.1:3000/api/contest

#echo -e ""
#echo -e "Testing GET -- /api/contest/byId/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byId/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byName/:str"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byName/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byTag/:tag"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byTag/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byCreator/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byCreator/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byCompetitor/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byCompetitor/12345

#echo -e ""
#echo -e "Testing GET -- /api/contest/byJudge/:slug"
#sudo curl -i -X GET http://127.0.0.1:3000/api/contest/byJudge/12345

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
#echo -e "Testing POST -- /api/entry"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"foo": "bar"}' http://127.0.0.1:3000/api/entry
