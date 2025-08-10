drop table if exists ai;

create table if not exists ai (
    ai_id int not null auto_increment primary key ,
    user_id int not null ,
    query text not null ,
    content text not null ,
    create_at datetime default now() ,
    update_at datetime default now() on update now(),
    foreign key (user_id) references user (user_id)
);