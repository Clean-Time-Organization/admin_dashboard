FROM public.ecr.aws/docker/library/node:16.14
WORKDIR /app
COPY . /app/
RUN npm install -f
#RUN npm install serve --save
RUN node node_modules/esbuild/install.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "start", "--", "--port", "3000", "--host", "0.0.0.0"]
#CMD ["npm", "run", "serve", "--", "-l", "3000"]
