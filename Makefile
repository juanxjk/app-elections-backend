up:
	docker-compose up -d --build  

up-stage:
	docker-compose -f docker-compose.yml -f docker-compose.stage.yml up -d --build

stop:
	docker-compose stop

down:
	docker-compose down

down-stage:
	docker-compose -f docker-compose.yml -f docker-compose.stage.yml down

logs:
	docker-compose logs -f
