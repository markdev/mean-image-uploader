#echo -e ""
#echo -e "Testing POST -- /api/user"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"email":"j@j.com", "password":"j", "password2":"j", "sex":"female", "avatar":"aasdfgfdefg", "dob":"april71983"}' http://127.0.0.1:3000/api/user

#echo -e ""
#echo -e "Testing GET -- /api/user/545173647db42f924010dbc4"
#sudo curl -i -X GET http://127.0.0.1:3000/api/user/545173647db42f924010dbc4

#echo -e ""
#echo -e "Testing PUT -- /api/user/password"
#sudo curl -X PUT -d email=mark.karavan@gmail.com -d password=marco http://127.0.0.1:3000/api/user/

#echo -e ""
#echo -e "Testing DELETE -- /api/user/mark.karavan@gmail.com"
#sudo curl DELETE http://127.0.0.1:3000/api/user/mark.karavan@gmail.com

echo -e ""
echo -e "Testing GET -- /api/user/list"
sudo curl -i -X GET http://127.0.0.1:3000/api/user/list

#echo -e ""
#echo -e "Testing PUT -- /api/user"
#sudo curl -X PUT -d email=mark.karavan@gmail.com -d password=marco http://127.0.0.1:3000/api/user/

#echo -e ""
#echo -e "Testing POST -- /api/user/avatar"
#sudo curl -i -X POST -H 'Content-Type: application/json' -d '{"email":"i@i.com", "password":"i", "sex":"female", "avatar":"aasdfgfdefg", "dob":"april71983"}' http://127.0.0.1:3000/api/user

#echo -e ""
#echo -e "Testing PUT -- /api/user/addlogin"
#sudo curl -X PUT -d email=mark.karavan@gmail.com -d password=marco http://127.0.0.1:3000/api/user/