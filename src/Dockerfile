FROM amazon/aws-lambda-python:3.12 as build

# install chrome dependecies
RUN dnf install atk at-spi2-atk gtk3 cups-libs pango \ 
    libXcomposite libXcursor libXdamage libXext libXtst libXt \
    libXrandr libXScrnSaver alsa-lib jq unzip -y

COPY ./chrome-installer.sh ./chrome-installer.sh
RUN ./chrome-installer.sh
RUN rm ./chrome-installer.sh

RUN pip install selenium

COPY main.py ./

CMD [ "main.lambda_handler" ] 