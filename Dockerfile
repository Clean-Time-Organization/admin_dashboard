FROM public.ecr.aws/docker/library/node:16.14
ARG mode
WORKDIR /app
COPY . /app/
RUN npm install -f
RUN npm install serve --save
RUN npm run $mode

EXPOSE 3000
CMD ["npm", "run", "serve", "--", "-l", "3000"]
