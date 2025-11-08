import { getFirestore, DocumentReference, QuerySnapshot } from "firebase-admin/firestore";

const db = getFirestore();
/**
 * Create a new document in a collection with auto-generated ID
 */
export const createDocument = async <T extends object>(
    collectionName: string,
    data: T
): Promise<string> => {
    const docRef = await db.collection(collectionName).add(data);
    console.log("Document added");
    return docRef.id;
};

/**
 * Get a single document by ID
 */
export const getDocumentById = async <T>(
    collectionName: string,
    documentId: string
): Promise<(T & { id: string }) | null> => {
    const docRef: DocumentReference = db.collection(collectionName).doc(documentId);
    const doc = await docRef.get();

    if (doc.exists) {
        return {
            id: doc.id,
            ...doc.data() as T
        };
    } else {
        console.log("No such document!");
        return null;
    }
};

/**
 * Get all documents from a collection
 */
export const getDocuments = async <T>(
    collectionName: string
): Promise<Array<T & { id: string }>> => {
    const snapshot: QuerySnapshot = await db.collection(collectionName).get();
    
    const documents: Array<T & { id: string }> = [];
    snapshot.forEach((doc) => {
        documents.push({
            id: doc.id,
            ...doc.data() as T
        });
    });
    
    return documents;
};

/**
 * Update a document by ID
 */
export const updateDocument = async <T>(
    collectionName: string,
    documentId: string,
    data: Partial<T>
): Promise<(T & { id: string }) | null> => {
    const docRef: DocumentReference = db.collection(collectionName).doc(documentId);
    
    // Check if document exists first
    const doc = await docRef.get();
    if (!doc.exists) {
        return null;
    }
    
    await docRef.update(data);
    console.log("Document updated");
    
    // Get and return updated document
    const updatedDoc = await docRef.get();
    return {
        id: updatedDoc.id,
        ...updatedDoc.data() as T
    };
};

/**
 * Delete a document by ID
 */
export const deleteDocument = async (
    collectionName: string,
    documentId: string
): Promise<boolean> => {
    const docRef: DocumentReference = db.collection(collectionName).doc(documentId);
    
    // Check if document exists first
    const doc = await docRef.get();
    if (!doc.exists) {
        return false;
    }
    
    await docRef.delete();
    console.log("Document deleted");
    return true;
};

/**
 * Query documents by a field value
 */
export const getDocumentsByField = async <T>(
    collectionName: string,
    field: string,
    value: any
): Promise<Array<T & { id: string }>> => {
    const snapshot: QuerySnapshot = await db
        .collection(collectionName)
        .where(field, "==", value)
        .get();
    
    const documents: Array<T & { id: string }> = [];
    snapshot.forEach((doc) => {
        documents.push({
            id: doc.id,
            ...doc.data() as T
        });
    });

    return documents;
};