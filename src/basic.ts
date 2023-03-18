import * as ort from "onnxruntime-node";
import * as path from "path";

export async function trySession() {
  try {
    // create a new session and load the specific model.
    const modelPath = path.resolve(__dirname, "model.onnx");
    const session = await ort.InferenceSession.create(modelPath);

    // prepare inputs. a tensor need its corresponding TypedArray as data
    const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const dataB = Float32Array.from([
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
    ]);
    const tensorA = new ort.Tensor("float32", dataA, [3, 4]);
    const tensorB = new ort.Tensor("float32", dataB, [4, 3]);

    // prepare feeds. use model input names as keys.
    const feeds = { a: tensorA, b: tensorB };

    // feed inputs and run
    const results = await session.run(feeds);

    // read from results
    const dataC = results.c.data;
    console.log(`data of result tensor 'c': ${dataC}`);
  } catch (e) {
    console.log(`failed to inference ONNX model: ${e}.`);
  }
}
