#echo -e ""
#echo -e "Testing POST -- /api/user"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"email":"homey@clown.com", "password":"homey", "password2":"homey", "sex":"female", "avatar":"aasdfgfdefg", "dob":"april71983"}' http://127.0.0.1:3000/api/user

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

echo -e ""
echo -e "Testing POST -- /api/user/avatar"
curl -F "slug=545011cb9935a84a1412e93c" -F "filecomment=This is an image file" -F "image=@/Users/markkaravan/Desktop/hammer.png" http://127.0.0.1:3000/api/user/avatar
#curl --upload-file hammer.png http://127.0.0.1:3000/api/user/avatar
#curl -X POST http://127.0.0.1:3000/api/user/avatar -H "Content-type: multipart/form-data" -F file=@hammer.png

#sudo curl -X PUT -F file=@~/Desktop/hammer.png http://127.0.0.1:3000/api/user/avatar

#echo -e ""
#echo -e "Testing PUT -- /api/user/addlogin"
#sudo curl -X PUT -d email=mark.karavan@gmail.com -d password=marco http://127.0.0.1:3000/api/user/