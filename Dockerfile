FROM public.ecr.aws/docker/library/node:18.16
WORKDIR /app
COPY . /app/
RUN npm install -f
EXPOSE 3000
CMD ["npm", "start", "--", "--port", "3000", "--host", "0.0.0.0"]

