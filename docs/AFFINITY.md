# Node Affinity & Anti-Affinity with Mattermost

Affinity is exposed through values options for the Mattermost deployments. If you want to schedule your Mattermost pods to deploy on specific nodes you can do that through the `nodeAffinity` value and as needed the `antiAffinity` value. Additional info is provided below as well to help in configuring this.

It is good to have a basic knowledge of node affinity and available options to you before customizing Mattermost in this way - the upstream kubernetes documentation [has a good walkthrough of this](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity).

## Values for Affinity

The `nodeAffinity` value at the top level for Mattermost should be used to specify affinity. The format to include follows what you'd specify at a pod level. See the example below for scheduling the Mattermost pods only to nodes with the label `node-type` equal to `mattermost`:

```yaml
nodeAffinity:
  requiredDuringSchedulingIgnoredDuringExecution:
    nodeSelectorTerms:
    - matchExpressions:
      - key: node-type
        operator: In
        values:
        - mattermost
```

## Values for Anti-Affinity

The `antiAffinity` value at the top level for Mattermost can be set to either `soft` or `hard` (soft = preferred, hard = required). Setting this will ensure that your Mattermost replicas do not deploy to the same node (or at least try to not deploy to the same node if using soft). See the below example for specifying a hard anti affinity:

```yaml
antiAffinity: "hard"
```
