{{/*
Selector labels
*/}}
{{- define "mattermost.bigbangSelectorLabels" -}}
app: {{ include "mattermost.name" . }}
installation.mattermost.com/installation: {{ include "mattermost.name" . }}
installation.mattermost.com/resource: {{ include "mattermost.name" . }}
{{- end }}
