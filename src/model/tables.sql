create table movies (
 id integer primary key auto_increment,
   movie_name varchar(100),
   movie_year integer,
   genre varchar(100), 
   finished boolean default false
);