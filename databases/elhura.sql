/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  11/18/2020 7:15:03 AM                    */
/*==============================================================*/


drop table if exists Address;

drop table if exists Admin;

drop table if exists Article;

drop table if exists CartElement;

drop table if exists Category;

drop table if exists Client;

drop table if exists Command;

drop table if exists CommandLine;

drop table if exists Company;

drop table if exists Role;

drop table if exists Shipping;

drop table if exists Tag;

drop table if exists articleTags;

drop table if exists favorites;

/*==============================================================*/
/* Table : Address                                              */
/*==============================================================*/
create table Address
(
   idAddress            int not null,
   street               varchar(254),
   postalCode           int,
   city                 varchar(254),
   region               varchar(254),
   country              varchar(254),
   primary key (idAddress)
);

/*==============================================================*/
/* Table : Admin                                                */
/*==============================================================*/
create table Admin
(
   idUser               int not null,
   idAddress            int,
   idRole               int,
   username             varchar(254),
   password             varchar(254),
   email                varchar(254),
   firstName            varchar(254),
   lastName             varchar(254),
   birthDate            datetime,
   birthPlace           varchar(254),
   primary key (idUser)
);

/*==============================================================*/
/* Table : Article                                              */
/*==============================================================*/
create table Article
(
   idArticle            int not null,
   idCategory           int,
   idUser               int,
   designation          varchar(254),
   unitPrice            numeric(8,0),
   wholesalePrice       numeric(8,0),
   primary key (idArticle)
);

/*==============================================================*/
/* Table : CartElement                                          */
/*==============================================================*/
create table CartElement
(
   idCartElement        int not null,
   idArticle            int,
   idUser               int,
   quantityArticleCartElement int,
   primary key (idCartElement)
);

/*==============================================================*/
/* Table : Category                                             */
/*==============================================================*/
create table Category
(
   idCategory           int not null,
   nameCategory         varchar(254),
   primary key (idCategory)
);

/*==============================================================*/
/* Table : Client                                               */
/*==============================================================*/
create table Client
(
   idUser               int not null,
   idRole               int,
   idShipping           int,
   idAddress            int,
   username             varchar(254),
   password             varchar(254),
   email                varchar(254),
   firstName            varchar(254),
   lastName             varchar(254),
   birthDate            datetime,
   birthplace           varchar(254),
   primary key (idUser)
);

/*==============================================================*/
/* Table : Command                                              */
/*==============================================================*/
create table Command
(
   idCommand            int not null,
   dateCommand          int,
   status               varchar(254),
   commandLinesNumber   int,
   total                int,
   primary key (idCommand)
);

/*==============================================================*/
/* Table : CommandLine                                          */
/*==============================================================*/
create table CommandLine
(
   idCommandLine        int not null,
   idCommand            int,
   idShipping           int,
   idArticle            int,
   quantityArticleCommandLine int,
   subtotal             numeric(8,0),
   primary key (idCommandLine)
);

/*==============================================================*/
/* Table : Company                                              */
/*==============================================================*/
create table Company
(
   idUser               int not null,
   idRole               int,
   idAddress            int,
   username             varchar(254),
   password             varchar(254),
   email                varchar(254),
   name                 varchar(254),
   siret                varchar(254),
   documents            datetime,
   primary key (idUser)
);

/*==============================================================*/
/* Table : Role                                                 */
/*==============================================================*/
create table Role
(
   idRole               int not null,
   nameRole             varchar(254),
   primary key (idRole)
);

/*==============================================================*/
/* Table : Shipping                                             */
/*==============================================================*/
create table Shipping
(
   idShipping           int not null,
   shippingAddress      int,
   billingAddress       int,
   primary key (idShipping)
);

/*==============================================================*/
/* Table : Tag                                                  */
/*==============================================================*/
create table Tag
(
   idTag                int not null,
   nameTag              varchar(254),
   primary key (idTag)
);

/*==============================================================*/
/* Table : articleTags                                          */
/*==============================================================*/
create table articleTags
(
   idArticle            int not null,
   idTag                int not null,
   primary key (idArticle, idTag)
);

/*==============================================================*/
/* Table : favorites                                            */
/*==============================================================*/
create table favorites
(
   idArticle            int not null,
   idUser               int not null,
   primary key (idArticle, idUser)
);

alter table Admin add constraint FK_adminAddress foreign key (idAddress)
      references Address (idAddress) on delete restrict on update restrict;

alter table Admin add constraint FK_userRole foreign key (idRole)
      references Role (idRole) on delete restrict on update restrict;

alter table Article add constraint FK_articleCategory foreign key (idCategory)
      references Category (idCategory) on delete restrict on update restrict;

alter table Article add constraint FK_articleCompany foreign key (idUser)
      references Company (idUser) on delete restrict on update restrict;

alter table CartElement add constraint FK_cartElementArticle foreign key (idArticle)
      references Article (idArticle) on delete restrict on update restrict;

alter table CartElement add constraint FK_cartElementClient foreign key (idUser)
      references Client (idUser) on delete restrict on update restrict;

alter table Client add constraint FK_clientAddress foreign key (idAddress)
      references Address (idAddress) on delete restrict on update restrict;

alter table Client add constraint FK_clientShipping foreign key (idShipping)
      references Shipping (idShipping) on delete restrict on update restrict;

alter table Client add constraint FK_userRole foreign key (idRole)
      references Role (idRole) on delete restrict on update restrict;

alter table CommandLine add constraint FK_commandLineArticle foreign key (idArticle)
      references Article (idArticle) on delete restrict on update restrict;

alter table CommandLine add constraint FK_commandLineCommand foreign key (idCommand)
      references Command (idCommand) on delete restrict on update restrict;

alter table CommandLine add constraint FK_commandLineShipping foreign key (idShipping)
      references Shipping (idShipping) on delete restrict on update restrict;

alter table Company add constraint FK_companyAddress foreign key (idAddress)
      references Address (idAddress) on delete restrict on update restrict;

alter table Company add constraint FK_userRole foreign key (idRole)
      references Role (idRole) on delete restrict on update restrict;

alter table Shipping add constraint FK_billingAddress foreign key (billingAddress)
      references Address (idAddress) on delete restrict on update restrict;

alter table Shipping add constraint FK_shippingAddress foreign key (shippingAddress)
      references Address (idAddress) on delete restrict on update restrict;

alter table articleTags add constraint FK_articleTags foreign key (idArticle)
      references Article (idArticle) on delete restrict on update restrict;

alter table articleTags add constraint FK_articleTags foreign key (idTag)
      references Tag (idTag) on delete restrict on update restrict;

alter table favorites add constraint FK_favorites foreign key (idArticle)
      references Article (idArticle) on delete restrict on update restrict;

alter table favorites add constraint FK_favorites foreign key (idUser)
      references Client (idUser) on delete restrict on update restrict;

