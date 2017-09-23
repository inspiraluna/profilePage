docker run -d \
  -e ROOT_URL=http://nicokrause.com \
  -e MONGO_URL=mongodb://nicokrause_com \
  -e MAIL_URL=smtp://localhost \
  -p 80:3002 \
  NicoKrause.com/app
