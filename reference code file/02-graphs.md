# Introduction to Graphs

A **graph** is a mathematical structure used to model pairwise relationships between objects. Formally, a graph G is defined as G = (V, E), where V is a set of vertices and E is a set of edges connecting them.

Unlike trees, graphs can have cycles, may lack a single root, and can have disconnected components.

## Graph Representations

### Adjacency Matrix

A 2D array of size V × V where `adj[i][j]` indicates whether an edge exists between vertex *i* and vertex *j*.

### Adjacency List

An array of lists — for each vertex, the list of its adjacent vertices. This is the preferred representation for sparse graphs.

```cpp
vector<vector<int>> adj(V);
adj[u].push_back(v);
adj[v].push_back(u);
```

---

# Graph Traversal

## Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking, using a stack (explicit or via recursion).

## Breadth-First Search (BFS)

BFS explores all neighbors at the current depth before moving to the next level, using a queue. BFS is the algorithm of choice for shortest paths in **unweighted** graphs.

| Feature | DFS | BFS |
|---------|-----|-----|
| Data structure | Stack | Queue |
| Shortest path? | No (in general) | Yes (unweighted) |
| Typical use | Cycle detection, topological sort | Shortest path, bipartite check |
