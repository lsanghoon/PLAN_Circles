CREATE TABLE USER (
  PNO INT PRIMARY KEY AUTO_INCREMENT COMMENT '회원번호',
  EMAIL VARCHAR(255) NOT NULL COMMENT '이메일',
  PWD VARCHAR(255) NOT NULL COMMENT '비밀번호',
  NAME VARCHAR(50) NOT NULL COMMENT '이름',
  BIRTH VARCHAR(20) NOT NULL COMMENT '생년월일',
  GENDER VARCHAR(2) NOT NULL COMMENT '성별',
  cPHONE VARCHAR(11) NOT NULL COMMENT '휴대폰번호',
  hPHONE VARCHAR(11) NOT NULL COMMENT '집번호',
  ADDR VARCHAR(255) NOT NULL COMMENT '주소',
  pIMG VARCHAR(255) NOT NULL COMMENT '이미지',
  JOB VARCHAR(10) NOT NULL COMMENT '직업',
  SCHOOL VARCHAR(255) COMMENT '학교명',
  STU_NO VARCHAR(20) COMMENT '학번',
  DEPT VARCHAR(30) COMMENT '학과',
  GRADUATE VARCHAR(1) COMMENT '졸업여부',
  APPRO VARCHAR(1) NOT NULL DEFAULT '0' COMMENT '승인여부'
);

승인여부
0 = 승인 대기 (준회원)
1 = 승인 (정회원)
2 = 운영자
3 = 관리자

insert into user (email, pwd, name, birth, gender, cphone, hphone, addr, pimg, job) 
values ('aaa@aaa.aaa', 'aaaa', 'name', '1992-10-10', 'M', '00000000', '0000000', '서울시 ㅇㅇ구 ㅇㅇ동', 'abc.jpg', '직장인');

insert into user (email, pwd, name, birth, gender, cphone, hphone, addr, pimg, job) 
values ('sss@sss.sss', 'ssss', 'ssss', '1992-11-11', 'F', '00000000', '0000000', '서울시 ㅇㅇ구 ㅇㅇ동', 'sss.jpg', '직장인');

CREATE TABLE 