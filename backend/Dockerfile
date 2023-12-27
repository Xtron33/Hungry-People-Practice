FROM php:8.3-apache

RUN apt-get update \
   # pgsql headers
    && apt-get install -y libpq-dev \
    && docker-php-ext-install pgsql pdo_pgsql pdo && a2enmod rewrite && a2enmod headers && apt-get install -y git

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
