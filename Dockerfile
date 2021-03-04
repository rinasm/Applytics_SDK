# Node container to build project

FROM node:slim as nodebuilder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# Go container to make a server build with frontend files
FROM golang:alpine AS goBuilder
WORKDIR /go/src/sdk
COPY --from=nodebuilder /usr/src/app/src/dist/applytics.js /usr/src/app/main.go ./
CMD ["ls"]  
RUN go mod init dashboard
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags '-w -s' -a -installsuffix cgo -o sdk

# Running go project in the smallest container available
FROM alpine:latest  AS sdk
RUN apk --no-cache add ca-certificates
WORKDIR /root/
EXPOSE 4000:4000
COPY --from=goBuilder /go/src/sdk/sdk ./
COPY --from=goBuilder /go/src/sdk/applytics.js  ./static/
CMD ["./sdk"]  
