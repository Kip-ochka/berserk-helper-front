import { useDispatch, useSelector } from "@/store";
import {
  addElement,
  addToSquad,
  decrementMulliganCount,
  deleteElement,
  deleteToSquad,
  incrementMulliganCount,
  setSequence,
  squadSelectors,
} from "@/store/squadSlice";
import { nanoid } from "nanoid";

import { ButtonCrystal } from "@/shared/ui/button-crystal/ui/ButtonCrystal";
import { ElementCheckBox } from "@/shared/ui/element-checkbox";

import Elite from "../../../shared/assets/crystal/icon-elite.png";
import Ordinary from "../../../shared/assets/crystal/icon-ordinary.png";
import { buttonsCrystal, elements } from "../model/constants";
import { TButtonCrystal } from "../model/types";
import style from "./style.module.scss";

export const SquadCalculator = () => {
  const { mulliganCount, goldCrystal, silverCrystal, squad } =
    useSelector(squadSelectors);

  const dispatch = useDispatch();
  const allCrystal = goldCrystal + silverCrystal;

  function handleSequenceCheck(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSequence(event.target.value));
  }

  function handlePlusClick() {
    dispatch(incrementMulliganCount());
  }

  function handleMinusClick() {
    dispatch(decrementMulliganCount());
  }

  function handleElementCheck(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) dispatch(addElement(event.target.value));
    else dispatch(deleteElement(event.target.value));
  }

  function handleEntityClick(entity: TButtonCrystal) {
    dispatch(addToSquad(entity));
  }

  function handleEntityToSquadClick(entity: TButtonCrystal) {
    dispatch(deleteToSquad(entity));
  }

  return (
    <main className={style.page}>
      {/* settings */}
      <section className={style.settings}>
        <div className={style.distribution}>
          {/* sequence */}
          <div>
            <h2 className={style.text}>Ход</h2>
            <div className={style.container}>
              <label htmlFor="first">
                <input
                  type="radio"
                  id="first"
                  name="sequence"
                  value="first"
                  onChange={handleSequenceCheck}
                  defaultChecked
                />
                <span className={style.square}>1</span>
              </label>

              <label htmlFor="second">
                <input
                  type="radio"
                  id="second"
                  name="sequence"
                  value="second"
                  onChange={handleSequenceCheck}
                />
                <span className={style.square}>2</span>
              </label>
            </div>
          </div>

          {/* mulligan */}
          <div>
            <h2 className={style.text}>Пересдачи</h2>
            <div className={style.container}>
              <button onClick={handleMinusClick} className={style.square}>
                &minus;
              </button>
              <p className={style.square}>{mulliganCount}</p>
              <button onClick={handlePlusClick} className={style.square}>
                &#43;
              </button>
            </div>
          </div>
        </div>

        {/* elements */}
        <div>
          <h2 className={style.text}>Стихии</h2>
          <ul className={style.elements}>
            {elements.map((element, index) => (
              <ElementCheckBox
                key={index}
                {...element}
                onChange={handleElementCheck}
              />
            ))}
          </ul>
        </div>

        {/* crystals */}
        <div className={style.wallet}>
          <p className={style.text}>
            Золото:{"\u00A0"}
            <span className={goldCrystal < 0 ? style.error : ""}>
              {goldCrystal}
            </span>
          </p>
          <p className={style.text}>
            Серебро:{"\u00A0"}
            <span className={silverCrystal < 0 ? style.error : ""}>
              {silverCrystal}
            </span>
          </p>
          <p className={style.text}>
            Всего:{"\u00A0"}
            <span className={allCrystal < 0 ? style.error : ""}>
              {allCrystal}
            </span>
          </p>
        </div>
      </section>

      {/* squad */}
      <section className={style.squad}>
        <ul className={style.list}>
          {squad.map((entity) => {
            const id = nanoid();
            return (
              <ButtonCrystal
                value={entity.value}
                path={entity.path}
                key={id}
                onClick={() =>
                  handleEntityToSquadClick({
                    value: entity.value,
                    path: entity.path,
                  })
                }
              />
            );
          })}
        </ul>
      </section>

      {/* entity */}
      <section className={style.crystal}>
        <ul className={style.list}>
          {buttonsCrystal.map((entity, index) => {
            return (
              <ButtonCrystal
                value={entity}
                path={Elite}
                key={index}
                onClick={() =>
                  handleEntityClick({ value: entity, path: Elite })
                }
              />
            );
          })}
        </ul>

        <ul className={style.list}>
          {buttonsCrystal.map((entity, index) => {
            return (
              <ButtonCrystal
                value={entity}
                path={Ordinary}
                key={index}
                onClick={() =>
                  handleEntityClick({ value: entity, path: Ordinary })
                }
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
};
