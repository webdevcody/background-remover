# Note:
#   Lock in build date on the tag (ex: 2023.03.29) - otherwise, we rebuild the
#   entire Docker image each time a tag is updated (ex: python:3.9-x86_64)
#
# Refs:
#   - https://github.com/peterheb/rembg-lambda/issues/1#issue-1621934443
#   - https://docs.aws.amazon.com/lambda/latest/dg/python-image.html
#   - https://gallery.ecr.aws/lambda/python (-> Image tags)

# Date (Timestamp) of the Image to Build
ARG DATE=2023.03.29.13
# Python Version - examples: [3.8, 3,9, 3.10]
ARG PY_VERSION=3.10
# Architecture of AWS Lambda Function, must be one of [x86_64, arm64]
ARG ARCH=x86_64

# For Private PyPI Repositories (Optional)
ARG PYPI_URL
ARG PYPI_USER
ARG PYPI_PASS

# Internal use
ARG AWS_LAMBDA_IMAGE=public.ecr.aws/lambda/python:${PY_VERSION}.${DATE}-${ARCH}

# Temp Stage
#
# Ref:
#   https://pythonspeed.com/articles/docker-cache-pip-downloads/
FROM --platform=linux/amd64 ${AWS_LAMBDA_IMAGE} AS builder

# Update as needed
ARG REMBG_AWS_LAMBDA_VERSION=0.2

ENV PYTHONUNBUFFERED 1

# Ref: https://stackoverflow.com/a/72551258/10237506
ENV PIP_ROOT_USER_ACTION=ignore

WORKDIR /deps

## Ref: https://dev.to/christo22694524/installing-private-python-packages-in-docker-images-1hgm
RUN echo "machine $(echo "$PYPI_URL" | awk -F[/:] '{print $4}') \
         "    login ${PYPI_USER} \
         "    password ${PYPI_PASS}" > /root/.netrc && \
    chown root ~/.netrc && \
    chmod 0600 ~/.netrc

RUN update-ca-trust && \
    mkdir -p /root/.config/pip && \
    echo -e '[global]\ntrusted-host = pypi.org files.pythonhosted.org pypi.python.org' > /root/.config/pip/pip.conf

# Install tools required for project
# Run `docker build --no-cache .` to update dependencies

RUN --mount=type=cache,target=/root/.cache/pip \
     pip install -U pip && \
     pip install rembg-aws-lambda~=${REMBG_AWS_LAMBDA_VERSION} -t .

# Install the function's dependencies using file requirements.txt
# from your project folder.
#
# NOTE:
#   In your `requirements.txt` file, do not include `rembg-aws-lambda` or
#   implied dependencies such as opencv-python-headless, Pillow, numpy.
#   Include them under a separate file as needed,
#   such as `requirements-dev.txt`.

COPY requirements.txt .

RUN  --mount=type=cache,target=/root/.cache/pip \
     pip install --no-input --upgrade --upgrade-strategy=only-if-needed \
        -r requirements.txt -t . && \
     # Remove Python modules (3.7 - 3.10) that AWS Lambda environments already have
     # https://gist.github.com/gene1wood/4a052f39490fae00e0c3
     rm -rf boto3 botocore dateutil docutils jmespath pip s3transfer setuptools simplejson six.py urllib3 && \
     # Remove unnecessary `*.dist-info*` folders
     find . -type d -name "*.dist-info*" -prune -exec rm -rf {} \;

# Final Stage
FROM --platform=linux/amd64 ${AWS_LAMBDA_IMAGE}

# TODO: Add labels as needed
LABEL maintainer="My Team"

COPY --from=builder /deps .

COPY . ./app

# TODO: Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD ["app.handler.lambda_handler"]