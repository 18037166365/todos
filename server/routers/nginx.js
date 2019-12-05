upstream todos{
  server 127.0.0.1:3001;
}

server {
  listen 80;
  #server_name 47.94.110.299;
  server_name todos.nlxiaoniao.cn;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://todos;
    proxy_redirect off;
  }
}




�
upstream wechat{
  server 127.0.0.1:8082;
}

server {
  listen 80;
  #server_name 47.94.110.299;
  server_name wechat.nlxiaoniao.cn;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://wechat;
    proxy_redirect off;
  }
}






upstream resume{
  server 127.0.0.1:8083;
}

server {
  listen 80;
  #server_name 47.94.110.299;
  server_name resume.nlxiaoniao.cn;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $host;
    proxy_set_header X-Nginx-Proxy true;

    proxy_pass http://resume;
    proxy_redirect off;
  }
}
~
~
