# Introduction to Trees

A **tree** is a hierarchical, non-linear data structure that consists of nodes connected by edges. Unlike arrays or linked lists, a tree organizes data hierarchically, resembling an actual tree in nature — with a root at the top and branches spreading downward.

> *A tree T is either empty, or it consists of a root node r and zero or more non-empty sub-trees, each connected to r by an edge.*

## Basic Terminology

| Term | Definition |
|------|------------|
| **Node** | The fundamental unit of a tree |
| **Root** | The topmost node; it has no parent |
| **Leaf** | A node with no children |
| **Subtree** | A tree formed by a node and all its descendants |

## Binary Trees

A **binary tree** is a tree in which each node has at most two children, called the **left child** and the **right child**.

```cpp
struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};
```

### Traversal Orders

There are three depth-first orders: inorder, preorder, and postorder — plus level-order (breadth-first).

---

# Binary Search Trees

A **Binary Search Tree (BST)** is a binary tree in which, for every node, all values in the left subtree are smaller and all values in the right subtree are larger.

```
        50
       /  \
      30    70
     / \   / \
    20 40 60  80
```

BSTs allow O(log n) average time for search, insertion, and deletion.

## Self-Balancing Trees

**AVL trees** and **Red-Black trees** keep the height of the tree balanced automatically, guaranteeing O(log n) operations even in the worst case.
