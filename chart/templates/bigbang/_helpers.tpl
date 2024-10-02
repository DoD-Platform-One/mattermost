{{/*
Selector labels
*/}}
{{- define "mattermost.bigbangSelectorLabels" -}}
app: {{ include "mattermost.name" . }}
installation.mattermost.com/installation: {{ include "mattermost.name" . }}
installation.mattermost.com/resource: {{ include "mattermost.name" . }}
{{- end }}
{{- define "minio.labels" -}}
app: minio
{{- end }}


{{- /* Returns an SSO host */ -}}
{{- define "sso.host" -}}
  {{- regexReplaceAll ".*//([^/]*)/?.*" .Values.sso.auth_endpoint "${1}" -}}
{{- end -}}

