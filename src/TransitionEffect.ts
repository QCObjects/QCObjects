import { Effect } from "./Effect";
import { logger } from "./Logger";
import { Package } from "./Package";
import { ClassFactory } from "./ClassFactory";
import { ITransitionEffect, IComponent, TTransitionEffectParams } from "types";

export class TransitionEffect extends Effect implements ITransitionEffect{
  duration = 385;
  defaultParams = {
    alphaFrom: 0,
    alphaTo: 1,
    angleFrom: 180,
    angleTo: 0,
    radiusFrom: 0,
    radiusTo: 30,
    scaleFrom: 0,
    scaleTo: 1
  };

  fitToHeight = false;
  fitToWidth = false;

  component!: IComponent;
  effects!: string[];

  apply({
    alphaFrom,
    alphaTo,
    angleFrom,
    angleTo,
    radiusFrom,
    radiusTo,
    scaleFrom,
    scaleTo
  }: TTransitionEffectParams):void {
    const _transition_ = this;
    logger.info("EXECUTING TransitionEffect  ");
    const componentRoot =_transition_.component.componentRoot;
    /* when the component is shadowed, componentRoot is the ShadowRoot itself,
       which carries no layout box, so measure its host element instead */
    const __measureTarget__:HTMLElement = (typeof componentRoot !== "undefined" && componentRoot !== null && typeof (componentRoot as any).getBoundingClientRect !== "function")
      ? (((componentRoot as ShadowRoot).host ?? componentRoot) as HTMLElement)
      : (componentRoot as HTMLElement);

    if (typeof componentRoot !== "undefined" && componentRoot !== null){
      if (_transition_.fitToHeight) {
        (__measureTarget__ as any).height = (typeof __measureTarget__.offsetParent === "object" && __measureTarget__.offsetParent !== null) ? (__measureTarget__.offsetParent?.scrollHeight) : (__measureTarget__.getBoundingClientRect().height);
      }
      if (_transition_.fitToWidth) {
        (__measureTarget__ as any).width = (typeof __measureTarget__.offsetParent === "object" && __measureTarget__.offsetParent !== null) ? (__measureTarget__.offsetParent?.scrollWidth) : (__measureTarget__.getBoundingClientRect().width);
      }
      if (_transition_.component.shadowed){
        ((componentRoot as ShadowRoot).host as HTMLElement).style.display = "block";
      } else {
        (componentRoot as HTMLElement).style.display = "block";
      }
      _transition_.effects.map( (effectClassName:string):string => {

        const __effectClass__ = ClassFactory(effectClassName) as unknown as typeof Effect;
        if (typeof __effectClass__ === "undefined") {
          logger.debug(`Transition effect ${effectClassName} was not found`);
          return effectClassName;
        }
        /* Effect classes declare apply() either as a STATIC method (Move, MoveYInFromBottom)
           or as an INSTANCE method (Fade). ES5 resolved it statically via _super_(),
           so prefer the static one and fall back to an instance. Reading apply from
           a bare instance falls through to the abstract Effect.prototype.apply */
        const __staticApply__ = (__effectClass__ as any).apply;
        let effectClassMethod: any = undefined;
        let effectScope: any = _transition_;
        if (typeof __staticApply__ === "function") {
          effectClassMethod = __staticApply__;
        } else {
          try {
            const __effectInstance__ = new (__effectClass__ as any)({});
            if (typeof __effectInstance__.apply === "function") {
              effectClassMethod = __effectInstance__.apply.bind(__effectInstance__);
              effectScope = __effectInstance__;
            }
          } catch (e: any) {
            logger.debug(`Transition effect ${effectClassName} could not be instantiated: ${e}`);
          }
        }
        if (typeof effectClassMethod !== "function") {
          logger.debug(`Transition effect ${effectClassName} does not declare an apply() method`);
          return effectClassName;
        }
        const componentHost = (_transition_.component.shadowed)? ((componentRoot as ShadowRoot).host) : (componentRoot);
        const effectParams = {
          alphaFrom,
          alphaTo,
          angleFrom,
          angleTo,
          radiusFrom,
          radiusTo,
          scaleFrom,
          scaleTo
        };        
        effectClassMethod.call(effectScope, componentHost,...Object.values(effectParams));
        return effectClassName;
      });
  
    }

  }

}

Package("com.qcobjects.effects.transitions.base", [
  TransitionEffect
]);
