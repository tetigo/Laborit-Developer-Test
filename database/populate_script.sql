insert into brand(brand) values ("Fiat");
insert into brand(brand) values("Volkswagen");

select * from brand;

insert into model(model, brand_id) values("Uno", (select id from brand where brand.brand = "Fiat"));
insert into model(model, brand_id) values("Mobi", (select id from brand where brand.brand = "Fiat"));
insert into model(model, brand_id) values("Argo", (select id from brand where brand.brand = "Fiat"));

insert into model(model, brand_id) values("Passat", (select id from brand where brand.brand = "Volkswagen"));
insert into model(model, brand_id) values("Jetta", (select id from brand where brand.brand = "Volkswagen"));
insert into model(model, brand_id) values("T-Cross", (select id from brand where brand.brand = "Volkswagen"));

select * from model where brand_id = 1;

insert into vehicle(fuel, yearModel, value, brand_id, model_id) values("Gasolina", 2020, "R$ 70.000,00", (select id from brand where brand.brand = "Volkswagen"), (select id from model where model.model = "T-Cross"));
insert into vehicle(fuel, yearModel, value, brand_id, model_id) values("Gasolina", 2020, "R$ 168.000,00", (select id from brand where brand.brand = "Volkswagen"), (select id from model where model.model = "Passat"));
insert into vehicle(fuel, yearModel, value, brand_id, model_id) values("Álcool", 2019, "R$ 45.000,00", (select id from brand where brand.brand = "Fiat"), (select id from model where model.model = "Uno"));
insert into vehicle(fuel, yearModel, value, brand_id, model_id) values("Álcool", 2018, "R$ 51.000,00", (select id from brand where brand.brand = "Fiat"), (select id from model where model.model = "Argo"));
insert into vehicle(fuel, yearModel, value, brand_id, model_id) values("Gasolina", 2019, "R$ 34.000,00", (select id from brand where brand.brand = "Fiat"), (select id from model where model.model = "Mobi"));

select * from vehicle;

select brand, model, yearModel, fuel, value
from brand
inner join model
on model.brand_id = brand.id
inner join vehicle
on vehicle.model_id = model.id;

#admin password = 123 criptografado com bcrypt 10 rounds
insert into user (email, password, usertype) values ("admin@email.com", "$2a$10$18wPvaQd221Rp1Zlk8SUDOVGyAkDGvDlaHnN3sDX4WaSrM8mMNZ0e", "admin");
#user password = abc criptografado com bcrypt 10 rounds
insert into user (email, password, usertype) values ("tiago@email.com", "$2a$10$ExVQ5HRnHqJCKphWQDHXruEQnzCpzRGGZiS1ceIvKp/JF1Q54O5IS", "user");

select * from user;
