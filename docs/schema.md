# Schema Information

## tracks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
artist      | string    | not null, defaults to owner's display name

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | integer   | not null
display_name    | integer   | not null, defaults to username
password_digest | string    | not null
session_token   | string    | not null

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
track_id    | string    | not null, foreign key (references tracks)

## shares
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
track_id    | string    | not null, foreign key (references tracks)

## follows
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
followed_user_id | integer   | not null, foreign key (references users)
follower_id      | integer   | not null, foreign key (references users)
