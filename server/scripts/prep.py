import pandas as pd
import os


def clean_csv(file: str, keep_col: list[str]):
    df = pd.read_csv(file, dtype=str)
    df = df[keep_col]
    df = df.dropna(how="any", axis=0)
    df = df.drop_duplicates()
    # df["STREET"] = df["STREET"].apply(lambda x: x.title())
    result_filename = os.path.splitext(file)[0] + "-result.csv"
    df.to_csv(result_filename, index=False)


clean_csv("poland.csv", ["NUMBER", "STREET",
          "CITY", "DISTRICT", "REGION", "POSTCODE"])
