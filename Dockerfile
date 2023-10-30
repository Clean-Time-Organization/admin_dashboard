FROM public.ecr.aws/docker/library/node:16.14
WORKDIR /app
COPY . /app/
RUN npm install -f
EXPOSE 3001
CMD ["npm", "start", "--", "--port", "3001", "--host", "0.0.0.0"]
