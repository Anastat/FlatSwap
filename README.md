# FlatSwap

https://flat-swap.herokuapp.com


MERN app implemented as a project for course "Software Business Start-up" Metropolia UAS. The goal is to create a test application for exchange rooms/flats between students. The result is deployed on Heroku. The app contains registration, login, adding host forms. A user can add her/his own host, the result will be displayed in the search list. Authorization is performed using JSON Web Tokens instead of cookies - to keep a user session. For the user interface was used React Semantic UI.


Additional packages are used:
- bcrypt https://www.npmjs.com/package/bcrypt
- serve https://www.npmjs.com/package/serve
- axios https://www.npmjs.com/package/axios
- multer https://www.npmjs.com/package/multer
- jsonwebtoken https://www.npmjs.com/package/jsonwebtoken


ToDo list:
- upload image for host/user
- change/add user information
- change/delete host
- display information about single host
